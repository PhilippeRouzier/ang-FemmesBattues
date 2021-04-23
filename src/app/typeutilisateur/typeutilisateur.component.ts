import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TypeUtilisateurService } from '../typeutilisateur.service';
import { TypeUtilisateur } from '../typeutilisateur';


@Component({
  selector: 'app-typeutilisateur',
  templateUrl: './typeutilisateur.component.html',
  styleUrls: ['./typeutilisateur.component.css']
})
export class TypeUtilisateurComponent implements OnInit {

  allTypeUtilisateurs: TypeUtilisateur[];

  constructor(private typeutilisateurservice:TypeUtilisateurService) { }

  ngOnInit(): void {
     this.loadAllTypeUtilisateur();
  }
  loadAllTypeUtilisateur() {
    var res = this.typeutilisateurservice.getAllTypeUtilisateur();
    res.subscribe(tu => { this.allTypeUtilisateurs = tu; });
  }

}