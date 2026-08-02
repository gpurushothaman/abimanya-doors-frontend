export { metadata } from "./metadata";
import { cookies } from "next/headers";
//Client Component
import Customize from "@components/client/door-customization/Customize";
//Api
import { getAllDoorCustomizeOptions } from "@services/doorCustomizeService";

export default async function CustomizePage() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token")?.value;

  try {
    const response = await getAllDoorCustomizeOptions(userToken);
    return <Customize optionsData={response?.data?.data} />;
  } catch (error) {    
      console.error("Unexpected Error:", error);
    return (
      <div>
        <h2>Failed to load customization data.</h2>
        <p>Please try again later.</p>
      </div>
    );
  }
}






