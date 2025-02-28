import { Petugas } from 'src/entities/petugas.entity';
import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    officerAcceptedLocation(id_petugas: string): Promise<Petugas>;
}
