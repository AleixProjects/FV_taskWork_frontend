import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import MaterialDetail from "~/components/materials/MaterialDetail";
import Modal from "~/components/Utils/Modal";
import { deleteMaterial, updateMaterial } from "~/data/materials.server";

export default function MaterialsDetail() {
  const navigate = useNavigate();

  function closeHandler() {
    console.log("Close Modal");
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <MaterialDetail />
    </Modal>
  );
}

export async function action({ request, params }: LoaderFunctionArgs) {
  console.log("Action Material");
  const materialId = params.id as string;
  const formdata = await request.formData();
  const method = await formdata.get("_method");
  console.log(method);

  if (method === "patch") {
    const image = formdata.get("image") as File;
    const imageName = image.name ? image.name : null;

    const materialData = {
      id: materialId,
      name: formdata.get("name") as string,
      description: formdata.get("description") as string,
      image: imageName as string,
    };
    console.log("PATCH Material");
    // console.log(materialData);
    await updateMaterial(materialData, request);
    return redirect(`/materials/${materialId}`);
  } else if (method === "delete") {
    console.log("DELETE Material");
    await deleteMaterial(materialId, request);
    console.log(`Material with id: ${materialId} deleted`);
    return redirect("/materials");
  }
}
