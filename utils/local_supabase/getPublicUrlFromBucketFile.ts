import supabase from "../../service/supabase";

function getPublicUrlFromBucketFile(bucketName: string, fileName: string) {
    return supabase.storage.from("airbnb").getPublicUrl(`${bucketName}/${fileName}`)
        .data.publicUrl;
}
 export default getPublicUrlFromBucketFile