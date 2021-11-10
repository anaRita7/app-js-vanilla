package com.controle_despesa.controller;

import com.controle_despesa.model.dto.CategoriaDTO;
import com.controle_despesa.model.entity.Categoria;
import com.controle_despesa.model.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria") // path (endereço do recurso)
public class CategoriaController {

    @Autowired
    CategoriaRepository categoriaRepository;

    @GetMapping("")
    public List<CategoriaDTO> getCategoria(){
        List<Categoria> categorias = categoriaRepository.findAll();
        return CategoriaDTO.converter(categorias);
    }

    @PostMapping("")
    public Categoria postCategoria(@RequestBody Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    @DeleteMapping("/{id}")
    public void deleteCategotia(@PathVariable long id) {
        categoriaRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
        Categoria existingCategoria = null;
        if(categoriaRepository.findById(id).isPresent())
            existingCategoria = categoriaRepository.findById(id).get();
        existingCategoria.setDescricao(categoria.getDescricao());

        categoriaRepository.save(existingCategoria);
    }
}
