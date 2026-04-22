import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/leads/:leadId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(@Param('leadId', ParseUUIDPipe) leadId: string) {
    return this.commentsService.findByLead(leadId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('leadId', ParseUUIDPipe) leadId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(leadId, dto);
  }
}
