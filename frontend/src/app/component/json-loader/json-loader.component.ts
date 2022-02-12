import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AgencyService } from 'src/app/service/agency.service';
import { LocationService } from 'src/app/service/location.service';
import { UserService } from 'src/app/service/user.service';
import Agency from 'src/model/agency.model';
import Location from 'src/model/location.model';
import Post, { Characteristics, Parking } from 'src/model/post.model';
import Responce from 'src/model/responce.model';
import User from 'src/model/user.model';

@Component({
  selector: 'app-json-loader',
  templateUrl: './json-loader.component.html',
  styleUrls: ['./json-loader.component.scss'],
})
export class JsonLoaderComponent implements OnInit {
  constructor(
    private ls: LocationService,
    private us: UserService,
    private as: AgencyService
  ) {}

  ngOnInit(): void {}

  data: any;

  load(ev: any) {
    this.data = ev.target.files[0];
  }

  parse() {
    // console.log(this.data);
    let r = new FileReader();
    r.readAsText(this.data, 'utf-8');
    r.onload = (e: any) => {
      const tmpdata: any = JSON.parse(e.target.result);
      this.getAgency(tmpdata.Advertiser[0].PIB);

      let t = {
        name: tmpdata.Advertiser[1].FirstName,
        phone: tmpdata.Advertiser[1].Phone,
        surname: tmpdata.Advertiser[1].LastName,
      };

      this.checkUser(t);
      this.getLocation(tmpdata.Realestate);
      this.setUpPostInfo(tmpdata.Realestate);
      console.log(this.DATA);

      if (this.DATA.u.agency != this.DATA.ag._id) {
        alert("User doesn't work at specified agency");
        return;
      }

      const prom = new Promise((res, rej) => {
        setTimeout(() => {
          this.emittedData = this.DATA.p;
          this.emittedData.advertiser = this.DATA.u._id;
          this.emittedData.location = this.DATA.l._id;
          res(this.emittedData);
        }, 1000);
      });

      prom.then((v: any) => {
        console.log(v);
        this.e.emit(v);
      });
    };
    r.onerror = (e) => {
      console.error(e);
    };
  }

  @Output() e = new EventEmitter<Post>();
  private DATA = new TMP();
  private emittedData = new Post();

  private checkUser(data: { name: string; surname: string; phone: string }) {
    const user: User = JSON.parse(sessionStorage.getItem('u')!);
    this.us.get(user._id).subscribe((d: Responce) => {
      const tmp: User = d.body;
      if (
        data.name != tmp.name ||
        data.surname != tmp.surname ||
        data.phone != tmp.phone
      ) {
        alert('Invalid user information in file');
        return;
      }
      this.DATA.u = tmp;
    });
  }

  private getAgency(pib: number) {
    this.as.get().subscribe((d: Responce) => {
      const data: Agency[] = d.body;
      for (let i = 0; i < data.length; i++) {
        if (data[i].pib?.toString() === pib.toString()) {
          this.DATA.ag = data[i];
          return;
        }
      }
      alert('Invalid agencu PIB');
      return;
    });
  }

  private getLocation(data: {
    City: string;
    Municipality: string;
    Street: string;
  }) {
    this.ls.get().subscribe((d: Responce) => {
      const loc: Location[] = d.body;
      for (let i = 0; i < loc.length; i++) {
        if (
          loc[i].city === data.City ||
          loc[i].municipality === data.Municipality ||
          loc[i].street === data.Street
        ) {
          this.DATA.l = loc[i];
          return;
        }
      }
      this.ls
        .new('new', {
          city: data.City,
          microlocations: [],
          municipality: data.Municipality,
          street: data.Street,
        })
        .subscribe((d: Responce) => {
          this.DATA.l = d.body;
        });

      return;
    });
  }

  private setUpPostInfo(postInfo: {
    Name: string;
    Microlocation: string;
    Area: number;
    Rooms: number;
    ConstructionYear: number;
    State: string;
    Heating: string;
    Floor: number;
    TotalFloors: number;
    Parking: string;
    MonthlyUtilities: number;
    Price: number;
    About: string;
    Characteristics: string[];
  }) {
    let tmp: any;
    this.DATA.p.about = postInfo.About;
    this.DATA.p.area = postInfo.Area;
    this.DATA.p.constructionYear = postInfo.ConstructionYear;
    this.DATA.p.floor = postInfo.Floor;
    this.DATA.p.heating = postInfo.Heating;
    this.DATA.p.microlocation = postInfo.Microlocation;
    this.DATA.p.monthlyUtilities = postInfo.MonthlyUtilities;

    tmp = postInfo.Parking.toLowerCase();
    switch (tmp) {
      case 'yes':
      case 'da':
        this.DATA.p.parking = Parking.YES;
        break;
      case 'no':
      case 'ne':
        this.DATA.p.parking = Parking.NO;
        break;
      default:
        alert('Parking invalid input');
        return;
    }

    this.DATA.p.price = postInfo.Price;
    this.DATA.p.rooms = postInfo.Rooms;
    this.DATA.p.state = postInfo.State;
    this.DATA.p.totalFloors = postInfo.TotalFloors;
    this.DATA.p.characteristics = [];

    for (let i = 0; i < postInfo.Characteristics.length; i++) {
      switch (postInfo.Characteristics[i]) {
        case Characteristics.BASEMENT:
          this.DATA.p.characteristics?.push(Characteristics.BASEMENT);
          break;
        case Characteristics.CLIMATE:
          this.DATA.p.characteristics?.push(Characteristics.CLIMATE);
          break;
        case Characteristics.ELEVATOR:
          this.DATA.p.characteristics?.push(Characteristics.ELEVATOR);
          break;
        case Characteristics.FRANC_BALCONY:
          this.DATA.p.characteristics?.push(Characteristics.FRANC_BALCONY);
          break;
        case Characteristics.GARAGE:
          this.DATA.p.characteristics?.push(Characteristics.GARAGE);
          break;
        case Characteristics.GARDEN:
          this.DATA.p.characteristics?.push(Characteristics.GARDEN);
          break;
        case Characteristics.INTERCOM:
          this.DATA.p.characteristics?.push(Characteristics.INTERCOM);
          break;
        case Characteristics.INTERNET:
          this.DATA.p.characteristics?.push(Characteristics.INTERNET);
          break;
        case Characteristics.LOGGIA:
          this.DATA.p.characteristics?.push(Characteristics.LOGGIA);
          break;
        case Characteristics.PHONE:
          this.DATA.p.characteristics?.push(Characteristics.PHONE);
          break;
        case Characteristics.TERRACE:
          this.DATA.p.characteristics?.push(Characteristics.TERRACE);
          break;
        default:
          console.log(`Skipped characteristic ${postInfo.Characteristics[i]}`);
          break;
      }
    }
  }
}

class TMP {
  ag: Agency = new Agency();
  u: User = new User();
  p: Post = new Post();
  l: Location = new Location();
}
