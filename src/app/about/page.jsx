'use client';
import { useEffect } from "react";

const About = () => {

    useEffect(() => {
        document.title = "AppleStore | About";
      }, []);

    return (
        <section className="max-w-6xl mx-auto min-h-screen p-4 font-roboto">
            <h1 className="text-3xl font-bold mb-6">About AppleStore 🍏</h1>
            <p className="text-lg mb-4">
                AppleStore is your trusted partner in the world of technology. We are passionate about providing the latest and greatest Apple products to our customers, ensuring that everyone can access the innovative solutions that Apple is known for. Whether you are looking for the latest iPhone 📱, a powerful MacBook 💻, or essential accessories 🎧, we have a comprehensive selection to meet your needs.
            </p>
            <p className="text-lg mb-4">
                Our mission is to deliver not just high-quality products but also an exceptional shopping experience. We understand that purchasing technology can be overwhelming, which is why our knowledgeable team is dedicated to assisting you every step of the way. From product selection to after-sales support, we strive to ensure that your experience with us is smooth and satisfying. 🤝
            </p>
            <p className="text-lg mb-4">
                In addition to our wide range of products, we also offer personalized services, including product demonstrations 🛠️ and technical support. Our goal is to empower our customers to make informed decisions and feel confident in their purchases. We believe that technology should enhance your life, and we are here to help you harness its full potential. 🌟
            </p>
            <p className="text-lg mb-4">
                At AppleStore, we value our customers and are committed to fostering a community of Apple enthusiasts. We regularly host events 🎉, workshops, and tutorials to help our customers learn more about their devices and discover new ways to use them effectively. Our goal is to create an environment where technology enthusiasts can connect, learn, and grow together. 🌱
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us 📞</h2>
            <p className="text-lg mb-2">
                <strong>Email:</strong> support@applestore.com
            </p>
            <p className="text-lg mb-2">
                <strong>Phone:</strong> +38 099 55 88 33
            </p>
            <p className="text-lg">
                <strong>Address:</strong> Lviv, Rynok Square, 1
            </p>
        </section>
    );
}

export default About;


