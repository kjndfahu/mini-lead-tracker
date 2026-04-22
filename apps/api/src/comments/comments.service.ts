import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByLead(leadId: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new NotFoundException(`Lead ${leadId} not found`);

    return this.prisma.comment.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(leadId: string, dto: CreateCommentDto) {
    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new NotFoundException(`Lead ${leadId} not found`);

    return this.prisma.comment.create({ data: { ...dto, leadId } });
  }
}
