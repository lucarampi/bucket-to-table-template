import { createClient, SupabaseClient } from "@supabase/supabase-js";

function getPublicUrlFromBucketFile(bucketName: string, fileName: string, supabase: SupabaseClient<any, "public", any> | undefined) {
    if (!supabase) return
    return supabase.storage.from("airbnb").getPublicUrl(`${bucketName}/${fileName}`)
        .data.publicUrl;
}
export default getPublicUrlFromBucketFile