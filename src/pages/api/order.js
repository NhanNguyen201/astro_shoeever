import { writeClient } from '../../helpers/sanityClient'

export const POST = async ({ request }) => {
  const data = await request.json();
  // const name = data.get("name");
  // const address = data.get("address");
  // const telephone = data.get("telephone");
  // const details = data.get("details");
  
  const { valid, errors } = checkValid(data);
  // Validate the data - you'll probably want to do more than this
  if (!valid) {
    return new Response(
      JSON.stringify({
        message: "Validation failed",
        errors: errors
      }),
      { status: 400 }
    );
  }
  // Do something with the data, then return a success response
  
  try {
    const result = await writeClient.create({
      _type: 'order',
      customerName: data.name,
      address: data.address,
      customerTelephone: data.telephone,
      shoeDetails: data.details,
    })
    return new Response(
      JSON.stringify({
        message: "Success ordering. Thank you for your order. We will get in touch shortly."
      }),
      { status: 200 }
    );
    
  } catch (error) {
    console.log("error", error)
    return new Response(
      JSON.stringify({
        message: "Something failed",
        errors: { general: "Unable to process your order at the moment. Please try again later." }
      }),
      { status: 500 }
    );
  }
};


function checkValid(data) {
  let errors = {};
  let valid = false;
  if (data.name == "") errors.name = "Name is required !!"
  if (data.address == "") errors.address = "Address is required !!"
  if (data.telephone == "") errors.telephone = "Telephone number is required !!"
  if (data.details == "") errors.details = " There must be something here, sir !!"
  
  if (Object.keys(errors).length === 0) valid = true;
  return { valid, errors };
}