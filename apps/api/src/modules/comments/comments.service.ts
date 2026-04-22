import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { LeadsRepository } from '../leads/leads.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly leadsRepository: LeadsRepository,
  ) {}

  async findByLead(leadId: string) {
    const lead = await this.leadsRepository.findById(leadId);
    if (!lead) throw new NotFoundException(`Lead ${leadId} not found`);
    return this.commentsRepository.findByLeadId(leadId);
  }

  async create(leadId: string, dto: CreateCommentDto) {
    const lead = await this.leadsRepository.findById(leadId);
    if (!lead) throw new NotFoundException(`Lead ${leadId} not found`);
    return this.commentsRepository.create(leadId, dto);
  }
}
