export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const atoll = searchParams.get("atoll");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const ratingMin = searchParams.get("rating");
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "12");

    const where: Record<string, unknown> = { active: true };

    if (type && type !== "all") {
      where.type = type;
    }

    if (priceMin || priceMax) {
      where.priceFrom = {};
      if (priceMin) (where.priceFrom as Record<string, unknown>).gte = parseFloat(priceMin);
      if (priceMax) (where.priceFrom as Record<string, unknown>).lte = parseFloat(priceMax);
    }

    if (ratingMin) {
      where.rating = { gte: parseFloat(ratingMin) };
    }

    if (featured === "true") {
      where.featured = true;
    }

    const [accommodations, total] = await Promise.all([
      db.accommodation.findMany({
        where,
        include: {
          island: {
            include: {
              atoll: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ featured: "desc" }, { rating: "desc" }],
      }),
      db.accommodation.count({ where }),
    ]);

    return NextResponse.json({
      data: accommodations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    return NextResponse.json(
      { error: "Failed to fetch accommodations" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };

    if (!["RESORT_OWNER", "GUESTHOUSE_OWNER", "ADMIN"].includes(user.role)) {
      return NextResponse.json(
        { error: "Only resort/guesthouse owners can create accommodations" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      name,
      type,
      islandId,
      description,
      images,
      priceFrom,
      amenities,
      lat,
      lng,
    } = body;

    if (!name || !type || !islandId || !description || !priceFrom) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const accommodation = await db.accommodation.create({
      data: {
        name,
        type,
        islandId,
        ownerId: user.id,
        description,
        images: images ?? [],
        priceFrom: parseFloat(priceFrom),
        amenities: amenities ?? {},
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
      },
    });

    return NextResponse.json({ data: accommodation }, { status: 201 });
  } catch (error) {
    console.error("Error creating accommodation:", error);
    return NextResponse.json(
      { error: "Failed to create accommodation" },
      { status: 500 }
    );
  }
}

