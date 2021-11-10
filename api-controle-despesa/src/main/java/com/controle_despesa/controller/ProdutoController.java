package com.controle_despesa.controller;

import com.controle_despesa.model.dto.ProdutoDTO;
import com.controle_despesa.model.entity.Produto;
import com.controle_despesa.model.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
    @Autowired
    ProdutoRepository produtoRepository;

    @GetMapping("")
    public List<ProdutoDTO> getProduto(){
        List<Produto> categorias = produtoRepository.findAll();
        return ProdutoDTO.converter(categorias);
    }

    @PostMapping("")
    public Produto postProduto(@RequestBody Produto produto){
        return produtoRepository.save(produto);
    }

    @DeleteMapping("/{id}")
    public void deleteProduto(@PathVariable long id) {
        produtoRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateCategoria(@PathVariable Long id, @RequestBody Produto produto) {
        Produto existingProduto = produtoRepository.findById(id).get();

        //existingProduto.setDescricao(produto.getDescricao());
        existingProduto = produto;
        produtoRepository.save(existingProduto);
    }
}
