package com.kobindustry.kobirightpro.service;

import com.kobindustry.kobirightpro.entities.Work;
import com.kobindustry.kobirightpro.repositories.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class workService {

    @Autowired
    private WorkRepository workRepository;

    public Work saveWork(Work work) {
        return workRepository.save(work);
    }

    public List<Work> getAllWorks() {
        return workRepository.findAll();
    }

    public Optional<Work> getWorkById(Long id) {
        return workRepository.findById(id);
    }

    public void deleteWork(Long id) {
        workRepository.deleteById(id);
    }

    public Work updateWork(Long id, Work updatedWork) {
        return workRepository.findById(id)
                .map(work -> {
                    work.setTitre(updatedWork.getTitre());
                    work.setSousTitre(updatedWork.getSousTitre());
                    work.setOrigine(updatedWork.getOrigine());
                    work.setDuree(updatedWork.getDuree());
                    work.setBpm(updatedWork.getBpm());
                    work.setInterprete(updatedWork.getInterprete());
                    work.setGenre(updatedWork.getGenre());
                    work.setStyle(updatedWork.getStyle());
                    work.setFichier(updatedWork.getFichier());
                    work.setAyantsDroit(updatedWork.getAyantsDroit());
                    return workRepository.save(work);
                })
                .orElseGet(() -> {
                    updatedWork.setId(id);
                    return workRepository.save(updatedWork);
                });
    }
}
