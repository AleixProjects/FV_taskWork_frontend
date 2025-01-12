import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import MaterialForm from "~/components/materials/MaterialForm";
import Modal from "~/components/Utils/Modal";
import { addMaterial } from "~/data/materials.server";
import { validateMaterial } from "~/data/validations.server";
import { Material } from "~/types/interfaces";

export default function MaterialAdd() {
    const navigate = useNavigate();

  function closeHandler() {
    console.log("Close Modal");
    navigate("..");
  }
  return (
    <>
      <Modal onClose={closeHandler}>
        <MaterialForm />
      </Modal>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("POST Material");
  const formData = await request.formData();
  const image = formData.get("image") as File;
  const imageName = image.name ? image.name : null

  const materialData: Material = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    image: imageName,
  };

    //Implementacio imatges

//   console.log(materialData);

    try {
        validateMaterial(materialData);
        console.log("Material validated");
    } catch (error) {
        return error;
    }
    
    await addMaterial(materialData, request);
    return redirect("/materials");
    }