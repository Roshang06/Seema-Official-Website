export default function FindUs() {
  const address =
    "3310 E Lake Sammamish Pkwy SE Suite F, Sammamish, WA 98075";
  const embedSrc =
    "https://www.google.com/maps?q=3310+E+Lake+Sammamish+Pkwy+SE+Suite+F,+Sammamish,+WA+98075&output=embed";
  const mapsLink =
    "https://www.google.com/maps/search/?api=1&query=Seema+Tasty+Delights,+3310+E+Lake+Sammamish+Pkwy+SE+Suite+F,+Sammamish,+WA+98075";

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 pb-20 flex items-center">
      <div className="max-w-5xl mx-auto p-6 w-full">
        <h1 className="text-center text-3xl font-bold mb-6">Find Us</h1>

        <div className="flex flex-col md:flex-row gap-6">
        {/* Left: instructions */}
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-3">Getting here</h2>
          <p className="text-gray-700 mb-4">Seema Tasty Delights</p>
          <p className="text-sm text-gray-600 mb-4">{address}</p>

          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              From I-90: take Exit 20 toward Sammamish. Head north on 228th
              Ave SE/Lake Sammamish Pkwy.
            </li>
            <li>
              Continue on Lake Sammamish Pkwy SE for about 3 miles, then turn
              right into the shopping center where Suite F is located.
            </li>
            <li>
              Parking is available in the lot—there is accessible parking near
              the main entrance.
            </li>
            <li>
              Walking from the Sammamish Commons bus stop: head east on Main St
              for 8 minutes; you'll see the restaurant on the right.
            </li>
          </ol>

          <p className="mt-4 text-sm text-gray-500">
            Note: these are placeholder directions. We can swap in exact
            directions later.
          </p>
        </div>

        {/* Right: map and link */}
        <div className="md:w-1/2">
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Seema Tasty Delights location"
              className="w-full h-full border-0"
              src={embedSrc}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-3 text-sm">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
