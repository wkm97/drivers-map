import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const coordinates = searchParams.get('coordinates')
  const params = new URLSearchParams({
    geometries: 'geojson',
    access_token: process.env.SECRET_MAPBOX_TOKEN || ""
  });

  const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?${params}`)
  const data = await res.json()

  return Response.json(data)
}