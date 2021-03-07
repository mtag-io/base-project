import { Injectable } from '@nestjs/common';
import { CreatePresetDto } from './@types/create-preset.dto';
import { UpdatePresetDto } from './@types/update-preset.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {PresetRepository} from "./preset.repository";

@Injectable()
export class PresetService {
  constructor(
      @InjectRepository(PresetRepository)
      private readonly presetRepository: PresetRepository
  ) {
  }
  create(createPresetDto: CreatePresetDto) {
    return this.presetRepository.createPreset(createPresetDto);
  }

  findAll() {
    return this.presetRepository.find();
  }

  findOne(_id: number) {
    return this.presetRepository.findOne(_id);
  }

  update(_id: number, updatePresetDto: UpdatePresetDto) {
    return this.presetRepository.update(_id, updatePresetDto);
  }

  remove(_id: number) {
    return this.presetRepository.delete(_id);
  }
}
