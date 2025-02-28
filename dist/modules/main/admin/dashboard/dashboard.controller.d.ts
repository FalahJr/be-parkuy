import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboards(): Promise<{
        message: string;
        total: {
            user: number;
            location: number;
            petugas: number;
            pengendara: number;
        };
    }>;
    getPetugasDashboards(search: string): Promise<{
        getPetugasDashboards: any;
    }>;
    getTransaction(search: string, status_bayar: string): Promise<{
        filter: any;
    }>;
}
