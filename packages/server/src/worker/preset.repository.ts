import {EntityRepository, Repository} from "typeorm";
import {Preset} from "./preset.entity";
import {CreatePresetDto} from "./@types/create-preset.dto";

@EntityRepository(Preset)
export class PresetRepository extends Repository<Preset> {

    async createPreset(createPresetDto: CreatePresetDto): Promise<Preset> {
        const { name, data } = createPresetDto;
        const preset: Preset = this.create();
        preset.name = name;
        preset.data = data;
        await preset.save()
        return preset
    }

}