import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PresetService } from './preset.service';
import { CreatePresetDto } from './@types/create-preset.dto';
import { UpdatePresetDto } from './@types/update-preset.dto';
import {UseGuards} from "@nest/core";
import {AuthGuard} from "@nestjs/passport";

@Controller('worker/preset')
@UseGuards(AuthGuard())
export class PresetController {
  constructor(private readonly presetService: PresetService) {}

  @Post()
  create(@Body() createPresetDto: CreatePresetDto) {
    return this.presetService.create(createPresetDto);
  }

  @Get()
  findAll() {
    return this.presetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presetService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePresetDto: UpdatePresetDto) {
    return this.presetService.update(+id, updatePresetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presetService.remove(+id);
  }
}
