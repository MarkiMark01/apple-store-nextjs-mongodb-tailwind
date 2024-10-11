import mongoose from "mongoose";
import { CartItems } from '../../models/CartItems'; 

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const cartItems = await CartItems.find();
    return new Response(JSON.stringify(cartItems), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching cart items:', error);

    return new Response(JSON.stringify({ error: 'Failed to fetch cart items' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const body = await req.json();

    const newCartItem = new CartItems({
      title: body.title,
      model: body.model,
      colour: body.colour,
      image: body.image,
      totalPrice: body.totalPrice,
      quantity: body.quantity
    });

    const savedItem = await newCartItem.save();

    return new Response(JSON.stringify(savedItem), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error adding item to cart:', error);

    return new Response(JSON.stringify({ error: 'Failed to add item to cart' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


// export async function DELETE(req) {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("MongoDB connected");

//     const url = new URL(req.url);
//     const id = url.searchParams.get("id"); 

//     if (!id) {
//       return new Response(
//         JSON.stringify({ error: "Item ID is missing" }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     const item = await CartItems.findById(id);
//     console.log("Item found:", item);
//     if (!item) {
//       console.log(`Item not found for ID: ${id}`);
//       return new Response(
//         JSON.stringify({ error: "Item not found" }),
//         {
//           status: 404,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     await CartItems.deleteOne({ _id: id });

//     return new Response(
//       JSON.stringify({ message: "Item removed successfully" }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Error deleting item from cart:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to delete item from cart" }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }



export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const item = await CartItems.findById(id);
      console.log("Item found:", item);
      if (!item) {
        console.log(`Item not found for ID: ${id}`);
        return new Response(
          JSON.stringify({ error: "Item not found" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      await CartItems.deleteOne({ _id: id });
      return new Response(
        JSON.stringify({ message: "Item removed successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } 
    else {
      // await CartItems.deleteMany({}); 

      // return new Response(
      //   JSON.stringify({ message: "All items removed successfully" }),
      //   {
      //     status: 200,
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete item from cart" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}