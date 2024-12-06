import RegisterForm from "@/components/authentication/sign-up";

export default function Home() { 
  return (
    <div className="flex items-center h-screen flex-col justify-center font-bold py-12 sm:px-6 lg:px-8 bg-gray-300">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl text-center font-bold tracking-tight text-gray-950">Register To Your Account</h2>
        <RegisterForm/>
    </div>
</div>
  );
}
