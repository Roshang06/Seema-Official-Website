import { client } from "@/sanity/lib/client";

export default async function FindUs() {
  const address =
    "3310 E Lake Sammamish Pkwy SE Suite F, Sammamish, WA 98075";
  const embedSrc =
    "https://www.google.com/maps?q=3310+E+Lake+Sammamish+Pkwy+SE+Suite+F,+Sammamish,+WA+98075&output=embed";
  const mapsLink =
    "https://www.google.com/maps/search/?api=1&query=Seema+Tasty+Delights,+3310+E+Lake+Sammamish+Pkwy+SE+Suite+F,+Sammamish,+WA+98075";
  const content = await client.fetch('*[_type == "findus"][0]{findustext}');

  const storeHours = [
    { day: "Friday", hours: "9 AM–8 PM" },
    { day: "Saturday", hours: "10 AM–7 PM" },
    { day: "Sunday", hours: "10 AM–7 PM" },
    { day: "Monday", hours: "Closed" },
    { day: "Tuesday", hours: "9 AM–8 PM" },
    { day: "Wednesday", hours: "9 AM–8 PM" },
    { day: "Thursday", hours: "9 AM–8 PM" },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#fdf2f8,#ffffff,#eff6ff)] pb-20 flex items-center">
      <div className="max-w-5xl mx-auto p-6 w-full">
        <h1 className="text-center text-3xl font-bold mb-6">Find Us</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: instructions */}
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-3">Getting here</h2>
            <p className="text-gray-700 mb-4">Seema Tasty Delights</p>
            <p className="text-sm text-gray-600 mb-4">{address}</p>

            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {content.findustext.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ol>
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

        {/* Store Hours */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Store Hours</h2>
          <ul className="divide-y divide-gray-200">
            {storeHours.map(({ day, hours }) => (
              <li
                key={day}
                className="flex justify-between py-2 text-gray-700"
              >
                <span className="font-medium">{day}</span>
                <span className={hours === "Closed" ? "text-red-500" : "text-gray-600"}>
                  {hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}