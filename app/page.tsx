// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

// DO NOT USE THIS FILE, IT'S A DEMO. THIS IS FOR THE ONLINE WEB SITE ONLY!
// GO TO THE /local DIRECTORY
// E.G.: localhost:3000/local

"use client";

import { BucketInfoType } from "../typings";
import generateRowsFromBucketFolder from "../utils/web_supabase/generateRowsFromBucketFolder";
import getDataFromBucketFolder from "../utils/web_supabase/getDataFromBucketFolder";
import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// const bucketInfo: BucketInfoType = {
//   bucketName: "airbnb",
//   folderName: "explore_nearby",
// };

const dataToInsert = [
  { time_distance: "1-hour drive" },
  { time_distance: "3-hour drive" },
  { time_distance: "30-minute drive" },
  { time_distance: "4.5-hour drive" },
  { time_distance: "7.5-hour drive" },
  { time_distance: "53-minute drive" },
  { time_distance: "12-hour drive" },
  { time_distance: "45-minute drive" },
];

export default function Page() {
  const [bucketFiles, setBucketFiles] = useState<any[]>([]);
  const [formatedFiles, setFormatedFiles] = useState<any[]>([]);
  const [needsLoadData, setNeedsLoadData] = useState(true);
  const SUPABASE_URL = useRef<HTMLInputElement>(null);
  const SUPABASE_ANON_KEY = useRef<HTMLInputElement>(null);
  const TABLE_NAME = useRef<HTMLInputElement>(null);
  const BUCKET_NAME = useRef<HTMLInputElement>(null);
  const FOLDER_NAME = useRef<HTMLInputElement>(null);

  const getBucketInfo = (): BucketInfoType => ({
    bucketName: BUCKET_NAME.current?.value || "",
    folderName: FOLDER_NAME.current?.value || "",
  });

  const supabaseClient = () => {
    try {
      const client = createClient(
        SUPABASE_URL.current?.value || "https://.com",
        SUPABASE_ANON_KEY.current?.value || "."
      );
      return client;
    } catch (error) {
      alert(error);
      return;
    }
  };

  async function hendleInsertToDatabase() {
    try {
      if (!formatedFiles.length || !bucketFiles.length || needsLoadData)
        throw new Error("Load files first/again!");

      const bucketInfo = getBucketInfo();

      const { data, error } = await supabaseClient()!
        .from(TABLE_NAME.current?.value || "")
        .insert(formatedFiles);
      if (error) throw error.message;
    } catch (error) {
      alert(error);
    }
  }

  async function handleBucketSeach() {
    const bucketInfo = getBucketInfo();

    const data = await getDataFromBucketFolder(bucketInfo, supabaseClient());
    console.log(data);
    setBucketFiles(data || []);

    const tableRows = generateRowsFromBucketFolder(
      bucketInfo,
      data || [],
      dataToInsert,
      supabaseClient(),
      { replaceTitleFor: "location" }
    );
    setFormatedFiles(tableRows || []);
    setNeedsLoadData(false);
  }

  return (
    <div className="flex flex-1 flex-col pt-4 px-8">
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
        <div className="flex justify-around shadow-md overflow-auto w-full flex-col gap-3 bg-gray-100 border-2 rounded-lg px-4 py-4">
          <div className="flex flex-col">
            <span className="font-medium">Supabase Credentials</span>
            <span className="text-red-500 text-xs font-medium">
              It doesn't store any data. But I highly recommend using it locally
              so you can customize the output, this is just a demo.
            </span>
          </div>
          <input
            defaultValue={process.env.NEXT_PUBLIC_SUPABASE_URL}
            className="px-4 py-1 rounded-md"
            ref={SUPABASE_URL}
            placeholder="SUPABASE_URL"
            type="text"
            id="SUPABASE_URL"
            name="SUPABASE_URL"
          />
          <input
            defaultValue={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
            className="px-4 py-1 rounded-md"
            ref={SUPABASE_ANON_KEY}
            placeholder="SUPABASE_ANON_KEY"
            type="text"
            id="SUPABASE_ANON_KEY"
            name="SUPABASE_ANON_KEY"
          />
        </div>

        <div className="flex justify-around shadow-md overflow-auto w-full flex-col gap-3 bg-gray-100 border-2 rounded-lg px-4 py-4">
          <div className="flex flex-col">
            <span className="font-medium">Params</span>
            <span className="text-red-500 text-xs font-medium">
              Remember that you table need to have the same columns as the
              Formated Data items
            </span>
          </div>
          <input
            className="px-4 py-1 rounded-md"
            ref={TABLE_NAME}
            placeholder="table name (to insert data)"
            type="text"
            id="TABLE_NAME"
            name="TABLE_NAME"
            defaultValue={"example_table"}
          />
          <input
            defaultValue={"airbnb"}
            className="px-4 py-1 rounded-md"
            ref={BUCKET_NAME}
            placeholder="bucket name (to search)"
            type="text"
            id="BUCKET_NAME"
            name="BUCKET_NAME"
          />
          <input
            className="px-4 py-1 rounded-md"
            ref={FOLDER_NAME}
            placeholder="folder name (to get files)"
            type="text"
            id="FOLDER_NAME"
            name="FOLDER_NAME"
            defaultValue={"explore_nearby"}
          />
        </div>

        <div className="flex justify-around shadow-md overflow-auto w-full flex-col gap-3 bg-gray-100 border-2 rounded-lg px-4 py-4">
          <div className="flex flex-col">
            <span className="font-medium">Options</span>
            <span className="text-red-500 text-xs font-medium">
              Remember that you table need to have the same columns as the
              Formated Data items
            </span>
          </div>
          <div className="flex w-full gap-4 items-center justify-between">
            <button
              type="button"
              className="rounded-md font-semibold w-1/2 border-2 border-yellow-400 bg-yellow-50 px-3 py-1 outline outline-transparent hover:bg-yellow-400 hover:outline-[3px] hover:outline-yellow-400 hover:shadow-sm hover:text-white hover:font-bold hover:border-white active:scale-95 transition-all duration-200 "
              onClick={async () => await handleBucketSeach()}
            >
              Load files
            </button>
            <span className="w-1/2">
              Total files found: {bucketFiles?.length}
            </span>
          </div>

          <button
            type="button"
            className="rounded-md font-semibold w-full border-2  border-red-400 bg-red-50 px-3 py-1 outline outline-transparent hover:bg-red-600 hover:outline-[3px] hover:outline-red-600 hover:shadow-sm hover:text-white hover:border-white active:scale-95 transition-all duration-200 "
            onClick={async () => await hendleInsertToDatabase()}
          >
            PERFORM FORMATED DATA INSERT
          </button>
        </div>
      </div>

      <main className="grid grid-cols-2 w-full break-words pt-4">
        <div className="flex w-full pr-4 items-center flex-col gap-6">
          <div className="flex flex-col flex-wrap overflow-scroll w-full shadow-md gap-4 bg-gray-100 border-2 rounded-lg px-4 py-4">
            <div className="flex justify-start">
              <span>Data from Bucket:</span>
            </div>
            <pre>{JSON.stringify(bucketFiles, null, " ")}</pre>
          </div>
        </div>
        <div className="flex w-full pl-4 items-center flex-col gap-6">
          <div className="flex flex-col flex-wrap overflow-scroll w-full shadow-md gap-4 bg-gray-100 border-2 rounded-lg px-4 py-4">
            <div className="flex justify-start">
              <span>New formated data:</span>
            </div>
            <pre>{JSON.stringify(formatedFiles, null, " ")}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}
