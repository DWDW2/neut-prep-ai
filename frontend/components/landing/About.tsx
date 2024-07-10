import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 h-fit" id='about'>
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 max-[800px]:w-full max-[800px]:h-fit">
              <Image
                className="h-fit w-full object-cover md:w-48"
                src="/landing/Uni.png"
                alt="Team photo"
                width={500}
                height={500}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Goal</div>
              <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Mission and Values
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500">
                We are dedicated to revolutionizing the way people work and collaborate. Our mission is to create flexible, inspiring workspaces that foster innovation and community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;