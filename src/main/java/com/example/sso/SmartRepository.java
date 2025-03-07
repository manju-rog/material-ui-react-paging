package com.example.sso;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SmartRepository extends JpaRepository<SmartEntity, Long> {

	@Query(value = "SELECT * FROM smart_entities " +
		       "WHERE id > :anchorId " +
		       "AND (:name IS NULL OR :name = '' OR LOWER(name) LIKE LOWER('%' || :name || '%')) " +
		       "ORDER BY id ASC " +
		       "FETCH FIRST :limit ROWS ONLY",
		       nativeQuery = true)
		List<SmartEntity> findOptimizedResults(
		    @Param("anchorId") long anchorId,
		    @Param("limit") int limit,
		    @Param("name") String name);
}
