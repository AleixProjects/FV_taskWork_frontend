import { LoaderFunctionArgs} from "@remix-run/node";
import { logout } from "~/data/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return await logout(request);
}
