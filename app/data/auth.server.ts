import { createCookieSessionStorage } from "@remix-run/node";
import { redirect } from "@remix-run/react";

import axios from "axios";
import { SignupInput, User } from "~/types/interfaces";
import { TypeErrors } from "./validations.server";

const url = process.env.API_URL;

const tokenCookie = createCookieSessionStorage({
  cookie: {
    name: "authToken",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dies
  },
});

export { tokenCookie };

export async function helloWorld() {
  console.log(url);
  try {
    const response = await axios.get(`${url}/hola-mon`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    console.log(response.data);
  } catch (error) {
    throw new Error("Error on helloWorld");
  }
  return {};
}

export async function signup({ name, email, password, role }: SignupInput) {
  console.log("signup");
  // console.log(name);
  try {
    const response = await axios.post(
      `${url}/register`,
      {
        name,
        email,
        password,
        role,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response);

    if (response.data.httpCode === 201 && response.data?.token) {
      const user = response.data.user;
      const token = response.data.token;

      console.log(user);

      return await createUserSession(user, token);
    } else {
      const valErr: TypeErrors = {
        name: "Invalid signup credentials",
        code: "401",
      };
      throw valErr;
    }
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error("Error on signup");
  }
}

export async function login({ email, password }: SignupInput) {
  // console.log("login");
  // console.log(url);
  try {
    const response = await axios.post(
      `${url}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200 && response.data?.token) {
      const user = response.data.user;
      const token = response.data.token;

      return await createUserSession(user, token);
    } else {
      const valErr: TypeErrors = {
        name: "Invalid login credentials",
        code: "401",
      };
      throw valErr;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Error on login");
  }
}

async function createUserSession(user: User, token: string) {
  const session = await tokenCookie.getSession();

  session.set("user", user);
  session.set("token", token);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await tokenCookie.commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  console.log("logout");
  return redirect("/", {
    headers: {
      "Set-Cookie": await tokenCookie.destroySession(
        await tokenCookie.getSession(cookieHeader)
      ),
    },
  });
}

export async function getUser(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;
  const session = await tokenCookie.getSession(cookieHeader);
  const user = session.get("user");
  return user || null;
}

export async function getToken(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;
  const session = await tokenCookie.getSession(cookieHeader);
  const token = await session.get("token");
  return token || null;
}
