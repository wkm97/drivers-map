import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const latitude = searchParams.get('latitude')
  const longitude = searchParams.get('longitude')
  const count = searchParams.get('count')

  if (latitude && longitude && count) {
    const params = new URLSearchParams({
      latitude,
      longitude,
      count
    });

    const res = await fetch(`https://qa-interview-test.qa.splytech.dev/api/drivers?${params}`)
    const data = await res.json()

    return Response.json(data)
  } else {
    return Response.json({ message: "Bad request" }, { status: 400 })
  }

}