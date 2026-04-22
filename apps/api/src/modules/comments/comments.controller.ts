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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('api/leads/:leadId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Отримати коментарі ліда' })
  @Get()
  findAll(@Param('leadId', ParseUUIDPipe) leadId: string) {
    return this.commentsService.findByLead(leadId);
  }

  @ApiOperation({ summary: 'Додати коментар до ліда' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('leadId', ParseUUIDPipe) leadId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(leadId, dto);
  }
}
