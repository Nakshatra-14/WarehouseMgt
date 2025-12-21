package com.example.warehouse.demo.Repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.warehouse.demo.Model.Scan;

@Repository
public interface ScanRepository extends JpaRepository<Scan, UUID> {
}