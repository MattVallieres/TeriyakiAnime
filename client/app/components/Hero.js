export const Hero = () => {
  return (
    <div
      className="relative bg-cover bg-center flex justify-center items-center"
      style={{ height: "600px", backgroundImage: "url('hero.jpg')", pointerEvents: 'none' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="text-white relative">
        <h1 className="text-5xl font-bold mb-2 uppercase text-orange-600 ml-4">Teriyaki Anime</h1>
        <p className="text-xl ml-4 font-bold uppercase">Experience your favourite anime anytime, anywhere!</p>
      </div>
    </div>
  );
};