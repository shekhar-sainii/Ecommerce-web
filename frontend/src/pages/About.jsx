import Title from "../components/Title";
import {assets} from "../assets/frontend_assets/assets"
import { NewsLetterBox } from "../components/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to Aura Wardrobe, where fashion meets individuality. Our
            mission is to bring you the latest trends and timeless styles that
            reflect your unique personality. Whether you are looking for
            something chic, casual, or bold, Aura Wardrobe has a collection that
            caters to every taste and occasion. With a passion for quality and a
            keen eye for detail, we ensure that every piece in our collection is
            designed to make you feel confident and stylish.
          </p>
          <p>
            At Aura Wardrobe, we believe that fashion should be accessible,
            empowering, and fun. That’s why we curate a wide range of
            fashionable clothing that doesn’t just follow trends but sets them.
            From handpicked fabrics to thoughtful designs, we prioritize comfort
            and creativity. Our goal is to be your go-to destination for outfits
            that elevate your wardrobe and make a lasting impression, all while
            offering a seamless shopping experience.
          </p>
          <p className="text-gray-800 text-2xl">Our Mission</p>
          <p>
            Our Mission is to inspire confidence through fashion by offering
            clothing that blends style, comfort, and affordability. We aim to
            create a diverse range of pieces that empower individuals to express
            their unique sense of self. At Aura Wardrobe, we are committed to
            making fashion inclusive, accessible, and sustainable, while
            constantly evolving to meet the needs of our customers and the
            environment. Our mission is to help you feel your best, every day,
            in every outfit.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At Aura Wardrobe, quality is at the heart of everything we do. We
            are dedicated to providing you with clothing that not only looks
            great but also stands the test of time. Each item in our collection
            undergoes a rigorous quality assurance process, from the selection
            of premium fabrics to the final stitching. We prioritize
            craftsmanship, ensuring that every detail is meticulously inspected.
            Our commitment to quality means that when you choose Aura Wardrobe,
            you’re choosing clothing that is durable, comfortable, and designed
            to last, all while maintaining an impeccable style.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            At Aura Wardrobe, we understand that convenience is key when it
            comes to shopping for fashion. That’s why we’ve designed a seamless
            online shopping experience, allowing you to browse, select, and
            purchase your favorite styles with ease. From an intuitive website
            interface to multiple payment options and fast, reliable shipping,
            we prioritize making fashion accessible and stress-free. Our goal is
            to ensure that you can enjoy the latest trends and wardrobe
            essentials from the comfort of your home, with just a few clicks.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            At Aura Wardrobe, delivering exceptional customer service is at the
            core of our brand. We believe that every customer deserves
            personalized attention and care, which is why our dedicated support
            team is always ready to assist you. Whether you have questions about
            sizing, need help with an order, or want styling advice, we’re here
            to make your shopping experience smooth and enjoyable. Our
            commitment to you goes beyond just providing fashionable clothing;
            we strive to ensure your complete satisfaction at every step, from
            browsing to delivery and beyond.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default About;