import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PrismaClient } from "@prisma/client";

export default function Home({ posts, properties }) {
  console.log("PROPS", properties);
  return (
    <div className={styles.container}>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Fetch all posts (in /pages/index.tsx)
export async function getStaticProps() {
  let projection = {
    _id: 1,
    "address.lat": 1,
    "address.lon": 1,
    "community.price_max": 1,
  };
  let limit = 20;
  let skip = 0;
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    include: { comments: true },
  });

  // ==== NOTE, the `findRaw` method will only work with MongoDB queries ====
  const properties = await prisma.newyorksample.findRaw({
    filter,
    options: {
      skip,
      limit,
      projection,
    },
  });
  return {
    props: { posts, properties },
  };
}

const filter = {
  coordinates: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-73.87074609223424, 40.80052872454884],
            [-74.03487764722632, 40.79854924535653],
            [-74.26509092631979, 40.69917437416104],
            [-74.03032916491804, 40.66491811179212],
            [-73.86984497781468, 40.72921401354004],
            [-73.87074609223424, 40.80052872454884],
          ],
        ],
      },
    },
  },
};
