import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const layers = searchParams.get("layers")?.split(",") ?? [
      "accommodations",
      "diveSites",
      "surfSpots",
      "fishingCharters",
      "marineLocations",
    ];

    const features: Record<string, unknown>[] = [];

    if (layers.includes("accommodations")) {
      const accommodations = await db.accommodation.findMany({
        where: { active: true, lat: { not: null }, lng: { not: null } },
        select: {
          id: true,
          name: true,
          type: true,
          lat: true,
          lng: true,
          priceFrom: true,
          rating: true,
          island: { select: { name: true, atoll: { select: { name: true } } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accommodations.forEach((acc: any) => {
        if (acc.lat && acc.lng) {
          features.push({
            type: "Feature",
            geometry: { type: "Point", coordinates: [acc.lng, acc.lat] },
            properties: {
              id: acc.id,
              name: acc.name,
              type: "accommodations",
              category: acc.type,
              island: acc.island.name,
              atoll: acc.island.atoll.name,
              priceFrom: acc.priceFrom,
              rating: acc.rating,
              link: `/booking`,
            },
          });
        }
      });
    }

    if (layers.includes("diveSites")) {
      const diveSites = await db.diveSite.findMany({
        select: {
          id: true,
          name: true,
          type: true,
          difficulty: true,
          lat: true,
          lng: true,
          depth: true,
          island: { select: { name: true, atoll: { select: { name: true } } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      diveSites.forEach((site: any) => {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [site.lng, site.lat] },
          properties: {
            id: site.id,
            name: site.name,
            type: "diveSites",
            category: site.type,
            difficulty: site.difficulty,
            island: site.island.name,
            atoll: site.island.atoll.name,
            depth: site.depth,
            link: `/diving`,
          },
        });
      });
    }

    if (layers.includes("surfSpots")) {
      const surfSpots = await db.surfSpot.findMany({
        select: {
          id: true,
          name: true,
          difficulty: true,
          waveType: true,
          lat: true,
          lng: true,
          island: { select: { name: true, atoll: { select: { name: true } } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      surfSpots.forEach((spot: any) => {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [spot.lng, spot.lat] },
          properties: {
            id: spot.id,
            name: spot.name,
            type: "surfSpots",
            category: spot.waveType,
            difficulty: spot.difficulty,
            island: spot.island.name,
            atoll: spot.island.atoll.name,
            link: `/surfing`,
          },
        });
      });
    }

    if (layers.includes("fishingCharters")) {
      const charters = await db.fishingCharter.findMany({
        include: {
          island: { include: { atoll: true } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      charters.forEach((charter: any) => {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [charter.island.lng, charter.island.lat] },
          properties: {
            id: charter.id,
            name: charter.name,
            type: "fishingCharters",
            category: "CHARTER",
            island: charter.island.name,
            atoll: charter.island.atoll.name,
            pricePerDay: charter.pricePerDay,
            link: `/fishing`,
          },
        });
      });
    }

    if (layers.includes("marineLocations")) {
      const locations = await db.marineLocation.findMany({
        select: {
          id: true,
          name: true,
          type: true,
          lat: true,
          lng: true,
          description: true,
          island: { select: { name: true, atoll: { select: { name: true } } } },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      locations.forEach((loc: any) => {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [loc.lng, loc.lat] },
          properties: {
            id: loc.id,
            name: loc.name,
            type: "marineLocations",
            category: loc.type,
            description: loc.description,
            island: loc.island.name,
            atoll: loc.island.atoll.name,
          },
        });
      });
    }

    const geojson = {
      type: "FeatureCollection",
      features,
    };

    return NextResponse.json(geojson, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching map data:", error);
    return NextResponse.json(
      { error: "Failed to fetch map data" },
      { status: 500 }
    );
  }
}
