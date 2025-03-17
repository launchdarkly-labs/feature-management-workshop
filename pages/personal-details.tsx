import Link from "next/link"
import { X, Check } from "lucide-react"

export default function PersonalDetailsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white p-8 shadow-xl">
        {/* Close button */}
        <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        {/* Progress indicator */}
        <div className="mb-10 flex items-center justify-center">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">1</div>
            <div className="w-16 h-1 bg-blue-600"></div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">2</div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500">3</div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Let's set up the rest of your details</h1>
          <p className="text-sm text-gray-600">You can update this information in your Account Portal</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Email */}
            <div className="relative">
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value="jane@email.com"
                  readOnly
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-3 pr-10 focus:border-blue-500 focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value="****************"
                  readOnly
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-3 pr-10 focus:border-blue-500 focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* First Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                defaultValue="Jane"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                defaultValue="Wilson"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">DOB</label>
              <input
                type="text"
                defaultValue="2/28/1978"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* SSN */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">SSN</label>
              <input
                type="text"
                defaultValue="***-**-****"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                defaultValue="220-415-9634"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                defaultValue="390 Fort St"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Apt */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Apt</label>
              <input
                type="text"
                defaultValue="245"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Zip */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Zip</label>
              <input
                type="text"
                defaultValue="94572"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center">
            <button
              type="submit"
              className="w-full max-w-xs rounded-full bg-blue-500 py-3 text-center font-medium text-white transition-colors hover:bg-blue-600"
            >
              Confirm details
            </button>
            <Link href="/" className="mt-4 text-sm text-gray-500 hover:text-gray-700">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

