export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");
    const atoll = searchParams.get("atoll");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "12");

    const where: Record<string, unknown> = {};

    if (difficulty && difficulty !== "all") {
      where.difficulty = difficulty.toUpperCase();
    }

    if (type && type !== "all") {
      where.type = type.toUpperCase();
    }

    const [diveSites, total] = await Promise.all([
      db.diveSite.findMany({
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
        orderBy: { name: "asc" },
      }),
      db.diveSite.count({ where }),
    ]);

    return NextResponse.json({
      data: diveSites,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching dive sites:", error);
    return NextResponse.json(
      { error: "Failed to fetch dive sites" },
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

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can create dive sites" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      name,
      islandId,
      lat,
      lng,
      depth,
      difficulty,
      type,
      description,
      marineLife,
      images,
      visibility,
      currentStrength,
    } = body;

    if (!name || !islandId || !lat || !lng || !depth || !difficulty || !type || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const diveSite = await db.diveSite.create({
      data: {
        name,
        islandId,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        depth: parseFloat(depth),
        difficulty,
        type,
        description,
        marineLife: marineLife ?? [],
        images: images ?? [],
        visibility: visibility ? parseFloat(visibility) : null,
        currentStrength: currentStrength ?? null,
      },
    });

    return NextResponse.json({ data: diveSite }, { status: 201 });
  } catch (error) {
    console.error("Error creating dive site:", error);
    return NextResponse.json(
      { error: "Failed to create dive site" },
      { status: 500 }
    );
  }
}

