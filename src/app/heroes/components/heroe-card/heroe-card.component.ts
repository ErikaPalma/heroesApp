import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../model/heroe.model';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.scss'],
})
export class HeroeCardComponent implements OnInit {
  constructor() {}
  // La ! es para indicarle a TS que siempre va a recibir un valor
  @Input() heroe!: Heroe;

  ngOnInit(): void {}
}
