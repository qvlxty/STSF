import { ControllerApiPrefix, Get, Post } from "frameworkCore/decorators/controller.decorator";
import { Controller } from "frameworkCore/base.controller";
import { Container } from "frameworkCore/container.class";
import { Repository } from "typeorm";
import { guestBook } from "./guestBook.entity";

@ControllerApiPrefix('/guestBook')
export class GuestBookController extends Controller {

    constructor(
        c: Container,
        private readonly guestBookRepo: Repository<guestBook> = c.getRepository(guestBook)
    ) { super(c); }

    @Get('/add')
    sendForm(req, res) {
        res.render('guestBook/form');
    }

    @Post('/addData')
    async storeData(req, res) {
        console.log(req.body);
        await this.guestBookRepo.save(req.body);
        return "Сохранено";
    }

    @Get('/allRecords')
    async allRecords(req, res) {
        const guestBookItems = await this.guestBookRepo.find();
        res.render('guestBook/list', {
            guestBookItems
        })
    }

}