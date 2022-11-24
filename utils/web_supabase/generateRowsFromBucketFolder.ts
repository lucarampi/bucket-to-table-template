import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { BucketInfoType, ConfigType } from "../../typings";


function getPublicUrlFromBucketFile(bucketInfo: BucketInfoType, fileName: string, supabase: SupabaseClient<any, "public", any> | undefined) {
    if (!supabase) return;
    return supabase.storage.from(bucketInfo.bucketName).getPublicUrl(`${bucketInfo.folderName}/${fileName}`)
        .data.publicUrl;
}


function generateRowsFromBucketFolder(bucketInfo: BucketInfoType, bucketFiles: any[], insertData: any, supabase: SupabaseClient<any, "public", any> | undefined, config: ConfigType = { noTitle: false, replaceTitleFor: "" }) {
    if (!supabase) return;
    const temp = bucketFiles?.map((file: any, index) => {

        if (!config?.noTitle) {
            if (!!config?.replaceTitleFor) {
                return ({
                    publicUrl: getPublicUrlFromBucketFile(bucketInfo, file.name, supabase),
                    [config?.replaceTitleFor]: file.name.split(".")[0].replaceAll("_", " "),
                    ...insertData[index]
                })
            }
            return ({
                publicUrl: getPublicUrlFromBucketFile(bucketInfo, file.name, supabase),
                title: file.name.split(".")[0].replaceAll("_", " "),
                ...insertData[index]
            })
        }
        return ({
            publicUrl: getPublicUrlFromBucketFile(bucketInfo, file.name, supabase),
            ...insertData[index]
        })

    });
    return temp;
};

export default generateRowsFromBucketFolder