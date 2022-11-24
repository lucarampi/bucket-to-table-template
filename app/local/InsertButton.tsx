"use client";

import supabase from "../../service/supabase";

interface InsertButtonProps {
  tableName: string;
  tableRows: any[];
}

export default function InsertButton({
  tableName,
  tableRows,
}: InsertButtonProps) {
  async function hendleInsertToDatabase() {
    // Inserir no banco de dados SQL
    try {
      const { error } = await supabase.from(tableName).insert(tableRows);
      if (error) throw error.message;
      alert('Data added. Check you database')
    } catch (error) {
      alert(error);
      return;
    }
  }
  return (
    <button
      type="button"
      className="rounded-md font-semibold w-full border-2  border-red-400 bg-red-50 px-3 py-1 outline outline-transparent hover:bg-red-600 hover:outline-[3px] hover:outline-red-600 hover:shadow-sm hover:text-white hover:border-white active:scale-95 transition-all duration-200 "
      onClick={async () => await hendleInsertToDatabase()}
    >
      PERFORM FORMATED DATA INSERT
    </button>
  );
}
