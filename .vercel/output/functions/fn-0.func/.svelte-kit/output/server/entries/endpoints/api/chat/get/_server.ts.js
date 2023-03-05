import { c as client } from "../../../../../chunks/database.js";
import { j as json } from "../../../../../chunks/index.js";
async function POST({ request }) {
  const formData = await request.formData();
  const data = await client.chat.findMany({
    where: {
      studentId: Number(formData.get("studentId"))
    }
  });
  return json({ data });
}
export {
  POST
};
