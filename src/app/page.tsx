export default function Home() {
  return (
    <div className="flex justify-center items-center text-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome, Boss!
        </h1>
        <p className="text-lg text-gray-600">We're glad to have you here.</p>
      </div>
    </div>
  );
}
