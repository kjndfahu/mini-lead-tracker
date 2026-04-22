import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadsRepository } from './leads.repository';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly leadsRepository: LeadsRepository) {}

  findAll(query: QueryLeadDto) {
    return this.leadsRepository.findAll(query);
  }

  async findOne(id: string) {
    const lead = await this.leadsRepository.findById(id);
    if (!lead) throw new NotFoundException(`Lead ${id} not found`);
    return lead;
  }

  create(dto: CreateLeadDto) {
    return this.leadsRepository.create(dto);
  }

  async update(id: string, dto: UpdateLeadDto) {
    await this.findOne(id);
    return this.leadsRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.leadsRepository.delete(id);
  }
}
