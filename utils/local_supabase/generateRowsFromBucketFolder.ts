import supabase from "../../service/supabase";
import { BucketInfoType, ConfigType } from "../../typings";


function getPublicUrlFromBucketFile(bucketInfo: BucketInfoType, fileName: string) {

    return supabase.storage.from(bucketInfo.bucketName).getPublicUrl(`${bucketInfo.folderName}/${fileName}`)
        .data.publicUrl;
}


function generateRowsFromBucketFolder(bucketInfo: BucketInfoType, bucketFiles: any[], insertData: any, config: ConfigType = { noTitle: false, replaceTitleFor: "" }) {
    const temp = bucketFiles?.map((file: any, index) => {

        if (!config?.noTitle) {
            if (!!config?.replaceTitleFor) {
                return ({
                    publicUrl: getPublicUrlFromBucketFile(bucketInfo, file.name),
                    [config?.replaceTitleFor]: file.name.split(".")[0].replaceAll("_", " "),
                    ...insertData[index]
                })
            }
            return ({
                publicUrl: getPublicUrlFromBucketFile(bucketInfo, file.name),
                title: file.name.split(".")[0].replaceAll("_", " "),
                ...insertData[index]
            })
        }
        return ({
            publicUrl: getPublicUrlFromBucketFile(bucketInfo, file.name),
            ...insertData[index]
        })

    });
    return temp;
};

export default generateRowsFromBucketFolder