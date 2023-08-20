/// <reference types="node" />
import { ConfigService } from "@nestjs/config";
export declare class S3Service {
    private configService;
    private readonly s3Client;
    private readonly bucket;
    private readonly region;
    constructor(configService: ConfigService);
    upload(fileName: string, file: Buffer): Promise<string>;
    private getFileUrl;
}
//# sourceMappingURL=s3.service.d.ts.map