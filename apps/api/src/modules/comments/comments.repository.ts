import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByLeadId(leadId: string) {
    return this.prisma.comment.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(leadId: string, dto: CreateCommentDto) {
    return this.prisma.comment.create({ data: { ...dto, leadId } });
  }
}
