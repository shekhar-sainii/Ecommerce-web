import { assets } from "../assets/admin_assets/assets"

export const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logomy} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            At Aura Wardrobe, we believe in redefining fashion with
            premium-quality clothing that is both stylish and sustainable.
            Founded in 2024, our mission is to offer trendsetting designs at
            affordable prices, while ensuring that every piece reflects our
            commitment to ethical fashion.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gay-600">
            <li>Home</li>
            <li>About US</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gay-600">
            <li>+91 12547 54454</li>
            <li>info@aurawardrobe.com</li>
            <li>aggarwaladitya839@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@Mycompany.com-All Right Reserved.{" "}
        </p>
      </div>
    </div>
  );
}
