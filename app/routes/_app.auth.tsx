import { ActionFunctionArgs } from "@remix-run/node";
import AuthForm from "~/components/Auth/AuthForm";
import { helloWorld, login } from "~/data/auth.server";
import { validateCredentials } from "~/data/validations.server";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthForm />
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("authMode") || "login";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  //   try {
  //     validateCredentials({ email, password });
  //   } catch (error) {
  //     return error;
  //   }

  // Gestió amb les dades
  try {
    if (authMode === "login") {
      // Autenticació (login)
        return await login({email, password});
    //   return await helloWorld();
    } else {
      // Creació d'usuari (signup)
      return await signup({ email, password });
    }
  } catch (error) {
    if (error.status === 422) {
      // retornem 'Data' a l'Action per tal que ho pugui mostrar també com abans amb la Validació.
      return { credentials: error.message };
    }
  }

  return {};
}
