import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeadsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryLeadDto) {
    const {
      q,
      status,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 20,
    } = query;

    const where: Prisma.LeadWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
      ];
    }

    const orderBy: Prisma.LeadOrderByWithRelationInput = { [sort]: order };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.lead.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  findById(id: string) {
    return this.prisma.lead.findUnique({ where: { id } });
  }

  create(dto: CreateLeadDto) {
    return this.prisma.lead.create({ data: dto });
  }

  update(id: string, dto: UpdateLeadDto) {
    return this.prisma.lead.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.lead.delete({ where: { id } });
  }
}
