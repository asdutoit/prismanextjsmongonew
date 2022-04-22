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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Sliver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                  Paid
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4">
                <span class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                  Outstanding
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                  Paid
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
